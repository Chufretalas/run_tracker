package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
)

type Run struct {
	Day      string  `json:"day"`
	Distance float32 `json:"distance"`
	Time     float32 `json:"time"`
	TimeVO2  float32 `json:"time_vo2"`
	AvgBPM   float32 `json:"avg_bpm"`
}

// App struct
type App struct {
	ctx  context.Context
	Runs []Run
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

// TODO: transform distance units to km and store them
func (a *App) SaveRun(r Run) {
	a.Runs = append(a.Runs, r)
	data, err := json.MarshalIndent(a.Runs, "", "\t")
	if err != nil {
		log.Fatal(err)
	}
	os.WriteFile("./data.json", data, 0644)
}

func (a *App) PrintAllRuns() {
	fmt.Println(a.Runs)
}
