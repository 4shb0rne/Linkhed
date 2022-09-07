package models

import (
	"errors"

	"github.com/jinzhu/gorm"
)

type Notification struct {
	gorm.Model
	UserID  uint32 `sql:"type:int REFERENCES users(id)" json:"user_id"`
	ActorID uint32 `sql:"type:int REFERENCES users(id)" json:"actor_id"`
	User    User   `gorm:"references:actor_id"`
	Content string `gorm:"size:255;not null;" json:"content"`
}

func (n *Notification) Validate() error {
	if n.Content == "" {
		return errors.New("required content")
	}
	if n.UserID < 1 {
		return errors.New("required user")
	}
	return nil
}

func (n *Notification) AddNotification(db *gorm.DB) (*Notification, error) {
	var err error = db.Debug().Model(&Notification{}).Create(&n).Error
	if err != nil {
		return &Notification{}, err
	}
	return n, nil
}

func (n *Notification) GetNotifications(db *gorm.DB, uid uint32) (*[]Notification, error) {
	var err error
	notifications := []Notification{}
	err = db.Debug().Model(&Notification{}).Where("user_id = ?", uid).Find(&notifications).Error
	if len(notifications) > 0 {
		for i := range notifications {
			err := db.Debug().Model(&User{}).Where("id = ?", notifications[i].ActorID).Take(&notifications[i].User).Error
			if err != nil {
				return &[]Notification{}, err
			}
		}
	}
	if err != nil {
		return &[]Notification{}, err
	}
	return &notifications, err
}

func (n *Notification) DeleteNotification(db *gorm.DB, pid uint64) (int64, error) {

	db = db.Debug().Model(&Notification{}).Where("id = ?", pid).Take(&Notification{}).Delete(&Notification{})

	if db.Error != nil {
		if gorm.IsRecordNotFoundError(db.Error) {
			return 0, errors.New("Notification not found")
		}
		return 0, db.Error
	}
	return db.RowsAffected, nil
}