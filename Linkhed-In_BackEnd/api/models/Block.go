package models

import (
	"errors"
	"time"

	"github.com/jinzhu/gorm"
)

type Block struct {
	UserID       uint64 `gorm:"primaryKey" sql:"type:int REFERENCES users(id)"`
	BlockID uint64 `gorm:"primaryKey" sql:"type:int REFERENCES users(id)"`
	Block User
	CreatedAt    time.Time
}

func (b *Block) Validate() error {
	if b.BlockID < 1 {
		return errors.New("required blockid")
	}
	if b.UserID < 1 {
		return errors.New("required userid")
	}
	return nil
}

func (b *Block) BlockUser(db *gorm.DB) (*Block, error) {
	var err error = db.Debug().Model(&Block{}).Create(&b).Error
	if err != nil {
		return &Block{}, err
	}
	return b, nil
}

func (b *Block) UnblockUser(db *gorm.DB, pid uint64, uid uint64) (int64, error) {
	db = db.Debug().Model(&Block{}).Where("block_id = ? and user_id = ?", pid, uid).Take(&Block{}).Delete(&Block{})
	if db.Error != nil {
		if gorm.IsRecordNotFoundError(db.Error) {
			return 0, errors.New("not found")
		}
		return 0, db.Error
	}
	return db.RowsAffected, nil
}