package main

import (
  "net/http"
  "github.com/gin-gonic/gin"
  "github.com/4shb0rne/Linkhed-In_BackEnd/models"
  "github.com/4shb0rne/Linkhed-In_BackEnd/Controllers"
)

func main() {
  models.DB()
  r := gin.Default()

  r.GET("/", func(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{"data": "hello world"})    
  })
  r.GET("/users", controllers.GetAllUsers)
  r.Run()
}