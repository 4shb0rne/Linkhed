package models

import (
	"errors"

	"github.com/jinzhu/gorm"
)

type Notification struct {
	gorm.Model
	UserID  uint32 `sql:"type:int REFERENCES users(id)" json:"user_id"`
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
	if err != nil {
		return &[]Notification{}, err
	}
	return &notifications, err
}
