package main

import (
	"log"

	"github.com/corexa/corexa/runtime/daemon/internal/app"
	"github.com/corexa/corexa/runtime/daemon/internal/config"
)

func main() {
	cfg := config.Load()
	application := app.New(cfg)

	log.Printf("corexad starting on %s", cfg.HTTPAddress())
	if err := application.Run(); err != nil {
		log.Fatal(err)
	}
}
