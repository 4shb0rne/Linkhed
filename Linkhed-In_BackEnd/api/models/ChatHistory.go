package models

import (
	"errors"

	"github.com/jinzhu/gorm"
)

type ChatHistory struct {
	UserID      uint64 `gorm:"primaryKey" sql:"type:int REFERENCES users(id)"`
	OtherUserID uint64 `gorm:"primaryKey" sql:"type:int REFERENCES users(id)"`
	OtherUser   User
}

func (ch *ChatHistory) Validate() error {
	if ch.UserID < 1 {
		return errors.New("required userid")
	}
	if ch.OtherUserID < 1 {
		return errors.New("required otheruserid")
	}
	return nil
}

func (ch *ChatHistory) AddChatHistory(db *gorm.DB) (*ChatHistory, error) {
	var err error = db.Debug().Model(&ChatHistory{}).Create(&ch).Error
	if err != nil {
		return &ChatHistory{}, err
	}
	return ch, nil
}