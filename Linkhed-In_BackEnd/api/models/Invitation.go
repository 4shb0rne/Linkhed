package models

import (
	"errors"

	"github.com/jinzhu/gorm"
)

type Invitation struct {
	gorm.Model
	UserID       uint32 `sql:"type:int REFERENCES users(id)" json:"user_id"`
	ConnectionID uint32 `sql:"type:int REFERENCES users(id)" json:"connection_id"`
	Content string
	User         User   `gorm:"references:connection_id"`
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

func (i *Invitation) DeleteInvitation(db *gorm.DB, pid uint64) (int64, error) {

	db = db.Debug().Model(&Invitation{}).Where("id = ?", pid).Take(&Invitation{}).Delete(&Invitation{})

	if db.Error != nil {
		if gorm.IsRecordNotFoundError(db.Error) {
			return 0, errors.New("Invitation not found")
		}
		return 0, db.Error
	}
	return db.RowsAffected, nil
}
