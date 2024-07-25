package main

import (
	"cmp"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"slices"
)

type Run struct {
	Id       int     `json:"id"`
	Day      string  `json:"day"`
	Distance float32 `json:"distance"`
	Time     float32 `json:"time"`
	TimeVO2  float32 `json:"time_vo2"`
	AvgBPM   float32 `json:"avg_bpm"`
}

func saveRunsToFile(runs any) {
	data, err := json.MarshalIndent(runs, "", "\t")
	if err != nil {
		log.Fatal(err)
	}
	os.WriteFile("./data.json", data, 0644)
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

func (a *App) SaveNewRun(newRun Run) {
	for _, run := range a.GetAllRuns() {
		if run.Id >= newRun.Id {
			newRun.Id = run.Id + 1
		}
	}
	a.Runs = append(a.Runs, newRun)
	saveRunsToFile(a.Runs)
}

func (a *App) UpdateRun(updatedRun Run) {
	a.GetAllRuns()
	for idx, run := range a.Runs {
		if run.Id == updatedRun.Id {
			a.Runs[idx] = updatedRun
		}
	}
	saveRunsToFile(a.Runs)
}

// Returns all runs and also updates a.Runs
func (a *App) GetAllRuns() []Run {
	data, err := os.ReadFile("./data.json")
	if err != nil {
		log.Fatal(err)
	}

	json.Unmarshal(data, &a.Runs)
	slices.SortFunc(a.Runs, func(run1, run2 Run) int {
		return cmp.Compare(run2.Day, run1.Day)
	})
	return a.Runs
}

func (a *App) DeleteRun(runId int) {
	a.GetAllRuns()
	a.Runs = slices.DeleteFunc(a.Runs, func(run Run) bool {
		return run.Id == runId
	})
	saveRunsToFile(a.Runs)
}

func (a *App) PrintAllRuns() {
	fmt.Println(a.GetAllRuns())
}
