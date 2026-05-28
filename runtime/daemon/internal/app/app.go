package app

import (
	"net/http"

	"github.com/corexa/corexa/runtime/daemon/internal/adapters/providers/registry"
	"github.com/corexa/corexa/runtime/daemon/internal/config"
	httptransport "github.com/corexa/corexa/runtime/daemon/internal/transport/http"
	chatusecase "github.com/corexa/corexa/runtime/daemon/internal/usecase/chat"
)

type Application struct {
	config     config.Config
	httpServer *http.Server
}

func New(cfg config.Config) Application {
	providers := registry.New(cfg)
	chatService := chatusecase.NewService(providers.Corexa)
	httpServer := httptransport.NewServer(cfg, chatService)

	return Application{
		config:     cfg,
		httpServer: httpServer,
	}
}

func (a Application) Run() error {
	return a.httpServer.ListenAndServe()
}
