package main

import (
	"embed"
	"encoding/json"
	"log"
	"os"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {

	// Create an instance of the app structure
	app := NewApp()

	_, err := os.Stat("./data.json")
	if err != nil {
		_, err := os.Create("./data.json")
		if err != nil {
			log.Fatal(err)
		}
	}

	data, err := os.ReadFile("./data.json")
	if err != nil {
		log.Fatal(err)
	}

	json.Unmarshal(data, &app.Runs)

	// Create application with options
	err = wails.Run(&options.App{
		Title:  "run_tracker",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		OnStartup: app.startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
