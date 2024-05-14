package main

import (
	"context"
	"fmt"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// transform distance units to km and store them
func (a *App) SaveRun(day string, distance float32, distanceUnit string, time, timeVO2, avgBPM float32) {
	fmt.Println(day, distance, distanceUnit, time, timeVO2, avgBPM)
}
