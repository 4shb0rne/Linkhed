package models

import (
	"errors"
	"time"

	"github.com/jinzhu/gorm"
)

type Follower struct {
	UserID       uint64 `gorm:"primaryKey"`
	FollowerID uint64 `gorm:"primaryKey" sql:"type:int REFERENCES users(id)"`
	User User
	Follower User
	CreatedAt    time.Time
}

func (f *Follower) Validate() error {
	if f.FollowerID < 1 {
		return errors.New("required followerid")
	}
	if f.UserID < 1 {
		return errors.New("required userid")
	}
	return nil
}

func (f *Follower) FollowUser(db *gorm.DB) (*Follower, error) {
	var err error = db.Debug().Model(&Follower{}).Create(&f).Error
	if err != nil {
		return &Follower{}, err
	}
	return f, nil
}

func (f *Follower) UnfollowUser(db *gorm.DB, pid uint64, uid uint64) (int64, error) {
	db = db.Debug().Model(&Follower{}).Where("follower_id = ? and user_id = ?", pid, uid).Take(&Follower{}).Delete(&Follower{})
	if db.Error != nil {
		if gorm.IsRecordNotFoundError(db.Error) {
			return 0, errors.New("not found")
		}
		return 0, db.Error
	}
	return db.RowsAffected, nil
}