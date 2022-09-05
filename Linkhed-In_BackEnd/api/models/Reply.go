package models

import (
	"errors"
	"fmt"
	"html"
	"strings"
	"time"

	"github.com/jinzhu/gorm"
)

type Reply struct {
	ID        uint64 `gorm:"primary_key;auto_increment" json:"id"`
	CommentID uint32 `sql:"type:int REFERENCES comments(id)" json:"comment_id"`
	Content   string `gorm:"size:255;not null;" json:"content"`
	User      User
	UserID    uint32
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}

func (r *Reply) Prepare() {
	r.ID = 0
	r.Content = html.EscapeString(strings.TrimSpace(r.Content))
	r.User = User{}
	r.CreatedAt = time.Now()
	r.UpdatedAt = time.Now()
}

func (r *Reply) Validate() error {
	if r.Content == "" {
		return errors.New("required content")
	}
	if r.UserID < 1 {
		return errors.New("required userid")
	}
	if r.CommentID < 1 {
		return errors.New("required commentid")
	}
	return nil
}

func (r *Reply) AddReply(db *gorm.DB) (*Reply, error) {
	var err error
	err = db.Debug().Model(&Reply{}).Create(&r).Error
	if err != nil {
		return &Reply{}, err
	}
	if r.ID != 0 {
		err = db.Debug().Model(&User{}).Where("id = ?", r.UserID).Take(&r.User).Error
		if err != nil {
			fmt.Print(&Reply{})
			return &Reply{}, err
		}
	}
	return r, nil
}

func (r *Reply) FindReplies(db *gorm.DB, pid uint64) (*[]Reply, error) {
	var err error
	replies := []Reply{}
	err = db.Debug().Model(&Reply{}).Where("post_id = ?", pid).Find(&replies).Error
	if err != nil {
		return &[]Reply{}, err
	}
	if len(replies) > 0 {
		for i := range replies {
			err := db.Debug().Model(&User{}).Where("id = ?", replies[i].UserID).Take(&replies[i].User).Error
			if err != nil {
				return &[]Reply{}, err
			}
		}
	}
	return &replies, nil
}

func (r *Reply) DeleteReply(db *gorm.DB, pid uint64) (int64, error) {

	db = db.Debug().Model(&Reply{}).Where("id = ?", pid).Take(&Reply{}).Delete(&Reply{})

	if db.Error != nil {
		if gorm.IsRecordNotFoundError(db.Error) {
			return 0, errors.New("Reply not found")
		}
		return 0, db.Error
	}
	return db.RowsAffected, nil
}