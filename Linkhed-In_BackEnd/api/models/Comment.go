package models

import (
	"errors"
	"fmt"
	"html"
	"strings"
	"time"

	"github.com/jinzhu/gorm"
)

type Comment struct {
	ID        uint64 `gorm:"primary_key;auto_increment" json:"id"`
	PostID    uint32
	Content   string `gorm:"size:255;not null;" json:"content"`
	User      User
	UserID    uint32
	Users     []*User   `gorm:"many2many:user_comments;"`
	Replies   []Reply
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}

func (c *Comment) Prepare() {
	c.ID = 0
	c.Content = html.EscapeString(strings.TrimSpace(c.Content))
	c.User = User{}
	c.CreatedAt = time.Now()
	c.UpdatedAt = time.Now()
}

func (c *Comment) Validate() error {
	fmt.Print(c)
	if c.Content == "" {
		return errors.New("required content")
	}
	if c.UserID < 1 {
		return errors.New("required user")
	}
	if c.PostID < 1 {
		return errors.New("required post")
	}
	return nil
}
func (c *Comment) AddComment(db *gorm.DB) (*Comment, error) {
	var err error
	err = db.Debug().Model(&Comment{}).Create(&c).Error
	if err != nil {
		return &Comment{}, err
	}
	if c.ID != 0 {
		err = db.Debug().Model(&User{}).Where("id = ?", c.UserID).Take(&c.User).Error
		if err != nil {
			fmt.Print(&Comment{})
			return &Comment{}, err
		}
	}
	fmt.Print(c)
	return c, nil
}

func (c *Comment) FindComments(db *gorm.DB, pid uint64) (*[]Comment, error) {
	var err error
	comments := []Comment{}
	err = db.Debug().Model(&Comment{}).Where("post_id = ?", pid).Preload("Users").Find(&comments).Error
	if err != nil {
		return &[]Comment{}, err
	}
	if len(comments) > 0 {
		for i := range comments {
			err := db.Debug().Model(&User{}).Where("id = ?", comments[i].UserID).Take(&comments[i].User).Error
			if err != nil {
				return &[]Comment{}, err
			}
		}
	}
	return &comments, nil
}
