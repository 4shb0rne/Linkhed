package models

import (
	"errors"
	"time"

	"github.com/jinzhu/gorm"
)

type UserComments struct {
	UserID    uint32 `gorm:"primaryKey"`
	CommentID    uint32 `gorm:"primaryKey"`
	CreatedAt time.Time
}

func (uc *UserComments) Validate() error {
	if uc.CommentID < 1 {
		return errors.New("required commentid")
	}
	if uc.UserID < 1 {
		return errors.New("required userid")
	}
	return nil
}

func (uc *UserComments) LikeComment(db *gorm.DB) (*UserComments, error) {
	var err error
	err = db.Debug().Model(&UserComments{}).Create(&uc).Error
	if err != nil {
		return &UserComments{}, err
	}
	return uc, nil
}

func (uc *UserComments) DislikeComment(db *gorm.DB, pid uint64, uid uint32) (int64, error) {
	db = db.Debug().Model(&UserPosts{}).Where("comment_id = ? and user_id = ?", pid, uid).Take(&UserComments{}).Delete(&UserComments{})
	if db.Error != nil {
		if gorm.IsRecordNotFoundError(db.Error) {
			return 0, errors.New("not found")
		}
		return 0, db.Error
	}
	return db.RowsAffected, nil
}
