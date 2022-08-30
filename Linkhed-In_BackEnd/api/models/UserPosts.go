package models

import (
	"errors"
	"time"

	"github.com/jinzhu/gorm"
)

type UserPosts struct {
	UserID    uint32 `gorm:"primaryKey"`
	PostID    uint32 `gorm:"primaryKey"`
	CreatedAt time.Time
}

func (up *UserPosts) Validate() error {
	if up.PostID < 1 {
		return errors.New("required postid")
	}
	if up.UserID < 1 {
		return errors.New("required userid")
	}
	return nil
}

func (up *UserPosts) LikePost(db *gorm.DB) (*UserPosts, error) {
	var err error = db.Debug().Model(&UserPosts{}).Create(&up).Error
	if err != nil {
		return &UserPosts{}, err
	}
	return up, nil
}

func (up *UserPosts) DislikePost(db *gorm.DB, pid uint64, uid uint32) (int64, error) {
	db = db.Debug().Model(&UserPosts{}).Where("post_id = ? and user_id = ?", pid, uid).Take(&UserPosts{}).Delete(&UserPosts{})
	if db.Error != nil {
		if gorm.IsRecordNotFoundError(db.Error) {
			return 0, errors.New("not found")
		}
		return 0, db.Error
	}
	return db.RowsAffected, nil
}
