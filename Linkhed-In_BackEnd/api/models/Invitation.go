package models

import (
	"errors"

	"github.com/jinzhu/gorm"
)

type Invitation struct {
	gorm.Model
	UserID       uint32 `sql:"type:int REFERENCES users(id)" json:"user_id"`
	ConnectionID uint32 `sql:"type:int REFERENCES users(id)" json:"connection_id"`
	User         User   `json:"user"`
}

func (i *Invitation) Validate() error {
	if i.UserID < 1 {
		return errors.New("required userid")
	}
	if i.ConnectionID < 1 {
		return errors.New("required connectionid")
	}
	return nil
}

func (i *Invitation) Prepare() {
	i.ID = 0
	i.User = User{}
}

func (i *Invitation) AddInvitation(db *gorm.DB) (*Invitation, error) {
	var err error
	err = db.Debug().Model(&Invitation{}).Create(&i).Error
	if err != nil {
		return &Invitation{}, err
	}
	if i.ID != 0 {
		err = db.Debug().Model(&Invitation{}).Where("id = ?", i.UserID).Take(&i.User).Error
		if err != nil {
			return &Invitation{}, err
		}
	}
	return i, nil
}
