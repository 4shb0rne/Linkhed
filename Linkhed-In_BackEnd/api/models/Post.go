package models

import (
	"errors"
	"html"
	"strings"
	"time"

	"github.com/jinzhu/gorm"
)

type Post struct {
	ID         uint64 `gorm:"primary_key;auto_increment" json:"id"`
	Content    string `gorm:"size:255;not null;" json:"content"`
	User       User   `json:"user"`
	UserID     uint32 `sql:"type:int REFERENCES users(id)" json:"user_id"`
	Attachment string `json:"attachment"`
	Comments   []Comment
	Users      []*User   `gorm:"many2many:user_posts;"`
	CreatedAt  time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt  time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}

func (p *Post) Prepare() {
	p.ID = 0
	p.Content = html.EscapeString(strings.TrimSpace(p.Content))
	p.User = User{}
	p.Attachment = html.EscapeString(strings.TrimSpace(p.Attachment))
	p.CreatedAt = time.Now()
	p.UpdatedAt = time.Now()
}

func (p *Post) Validate() error {
	if p.Content == "" {
		return errors.New("required content")
	}
	if p.UserID < 1 {
		return errors.New("required user")
	}
	return nil
}

func (p *Post) SavePost(db *gorm.DB) (*Post, error) {
	var err error
	err = db.Debug().Model(&Post{}).Create(&p).Error
	if err != nil {
		return &Post{}, err
	}
	if p.ID != 0 {
		err = db.Debug().Model(&User{}).Where("id = ?", p.UserID).Take(&p.User).Error
		if err != nil {
			return &Post{}, err
		}
	}
	return p, nil
}

func (p *Post) FindAllPosts(db *gorm.DB) (*[]Post, error) {
	var err error
	posts := []Post{}
	err = db.Debug().Model(&Post{}).Find(&posts).Error
	er := db.Debug().Model(&Post{}).Preload("Users").Find(&posts).Error
	if err != nil || er != nil {
		return &[]Post{}, err
	}
	if len(posts) > 0 {
		for i := range posts {
			err := db.Debug().Model(&User{}).Where("id = ?", posts[i].UserID).Take(&posts[i].User).Error
			err2 := db.Debug().Model(&posts[i]).Preload("Comments").Find(&posts[i]).Error
			if len(posts[i].Comments) > 0 {
				for j := range posts[i].Comments {
					err3 := db.Debug().Model(&posts[i].Comments[j]).Preload("Replies").Find(&posts[i].Comments[j]).Error
					err4 := db.Debug().Model(&User{}).Where("id = ?", posts[i].Comments[j].UserID).Take(&posts[i].Comments[j].User).Error
					_ = err3
					_ = err4
					if len(posts[i].Comments[j].Replies) > 0 {
						for z := range posts[i].Comments[j].Replies {
							err5 := db.Debug().Model(&User{}).Where("id = ?", posts[i].Comments[j].Replies[z].UserID).Take(&posts[i].Comments[j].Replies[z].User).Error
							_ = err5
						}
					}
				}
			}
			if err != nil || err2 != nil {
				return &[]Post{}, err
			}
		}
	}
	return &posts, nil
}

func (p *Post) FindPostByID(db *gorm.DB, pid uint64) (*Post, error) {
	var err error
	err = db.Debug().Model(&Post{}).Where("id = ?", pid).Take(&p).Error
	if err != nil {
		return &Post{}, err
	}
	if p.ID != 0 {
		err = db.Debug().Model(&User{}).Where("id = ?", p.UserID).Take(&p.User).Error
		if err != nil {
			return &Post{}, err
		}
	}
	return p, nil
}

func (p *Post) UpdateAPost(db *gorm.DB) (*Post, error) {

	var err error
	// db = db.Debug().Model(&Post{}).Where("id = ?", pid).Take(&Post{}).UpdateColumns(
	// 	map[string]interface{}{
	// 		"title":      p.Title,
	// 		"content":    p.Content,
	// 		"updated_at": time.Now(),
	// 	},
	// )
	// err = db.Debug().Model(&Post{}).Where("id = ?", pid).Take(&p).Error
	// if err != nil {
	// 	return &Post{}, err
	// }
	// if p.ID != 0 {
	// 	err = db.Debug().Model(&User{}).Where("id = ?", p.AuthorID).Take(&p.Author).Error
	// 	if err != nil {
	// 		return &Post{}, err
	// 	}
	// }
	err = db.Debug().Model(&Post{}).Where("id = ?", p.ID).Updates(Post{Content: p.Content, UpdatedAt: time.Now()}).Error
	if err != nil {
		return &Post{}, err
	}
	if p.ID != 0 {
		err = db.Debug().Model(&User{}).Where("id = ?", p.UserID).Take(&p.User).Error
		if err != nil {
			return &Post{}, err
		}
	}
	return p, nil
}

func (p *Post) DeleteAPost(db *gorm.DB, pid uint64, uid uint32) (int64, error) {

	db = db.Debug().Model(&Post{}).Where("id = ? and author_id = ?", pid, uid).Take(&Post{}).Delete(&Post{})

	if db.Error != nil {
		if gorm.IsRecordNotFoundError(db.Error) {
			return 0, errors.New("Post not found")
		}
		return 0, db.Error
	}
	return db.RowsAffected, nil
}
