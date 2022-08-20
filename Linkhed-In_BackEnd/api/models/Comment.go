package models
import (
	"time"
)
type Comment struct{
	ID        uint64    `gorm:"primary_key;auto_increment" json:"id"`
	Comment    User      `json:"comment"`
	CommentID  uint32    `sql:"type:int REFERENCES posts(id)" json:"post_id"`
	Content   string    `gorm:"size:255;not null;" json:"content"`
	Author    User      `json:"author"`
	AuthorID  uint32    `sql:"type:int REFERENCES users(id)" json:"author_id"`
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}