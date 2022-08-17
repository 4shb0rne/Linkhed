package controllers
import (
 "net/http"
"github.com/gin-gonic/gin"
 "github.com/4shb0rne/Linkhed-In_BackEnd/models"
 "fmt"
)

var dbCon = models.DB()

func GetAllUsers(c *gin.Context) {
	var users []models.User

	if err := dbCon.Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": true, "details": err.Error()})
		return
	}
	fmt.Print(users)
	c.JSON(http.StatusOK, &users)
}