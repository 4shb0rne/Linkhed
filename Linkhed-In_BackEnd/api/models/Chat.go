package models

import (
	"errors"

	"github.com/jinzhu/gorm"
)

type Chat struct {
	gorm.Model
	UserID       uint32 `sql:"type:int REFERENCES users(id)" json:"user_id"`
	User User
	OtherID uint32 `sql:"type:int REFERENCES users(id)" json:"other_id"`
	Content string
}

func (c *Chat) Validate() error {
	if c.UserID < 1 {
		return errors.New("required userid")
	}
	if c.OtherID < 1 {
		return errors.New("required otherid")
	}
	if c.Content == ""{
		return errors.New("required content")
	}
	return nil
}

func (c *Chat) AddChat(db *gorm.DB) (*Chat, error) {
	var err error
	err = db.Debug().Model(&Chat{}).Create(&c).Error
	if err != nil {
		return &Chat{}, err
	}
	if c.ID != 0 {
		err = db.Debug().Model(&User{}).Where("id = ?", c.UserID).Take(&c.User).Error
		if err != nil {
			return &Chat{}, err
		}
	}
	return c, nil
}