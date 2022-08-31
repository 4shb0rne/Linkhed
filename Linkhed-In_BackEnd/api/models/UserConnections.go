package models

import (
	"errors"
	"time"

	"github.com/jinzhu/gorm"
)

type UserConnections struct {
	UserID       uint64 `gorm:"primaryKey"`
	ConnectionID uint64 `gorm:"primaryKey"`
	CreatedAt    time.Time
}

func (uc *UserConnections) Validate() error {
	if uc.ConnectionID < 1 {
		return errors.New("required connectionid")
	}
	if uc.UserID < 1 {
		return errors.New("required userid")
	}
	return nil
}

func (uc *UserConnections) ConnectUser(db *gorm.DB) (*UserConnections, error) {
	var err error = db.Debug().Model(&UserConnections{}).Create(&uc).Error
	if err != nil {
		return &UserConnections{}, err
	}
	return uc, nil
}

func (uc *UserConnections) DisconnectUser(db *gorm.DB, pid uint64, uid uint64) (int64, error) {
	db = db.Debug().Model(&UserPosts{}).Where("connection_id = ? and user_id = ?", pid, uid).Take(&UserConnections{}).Delete(&UserConnections{})
	if db.Error != nil {
		if gorm.IsRecordNotFoundError(db.Error) {
			return 0, errors.New("not found")
		}
		return 0, db.Error
	}
	return db.RowsAffected, nil
}
