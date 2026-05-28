package http

import (
	"encoding/json"
	"net/http"

	"github.com/corexa/corexa/runtime/daemon/internal/config"
	domainchat "github.com/corexa/corexa/runtime/daemon/internal/domain/chat"
	"github.com/corexa/corexa/runtime/daemon/internal/domain/workspace"
	chatusecase "github.com/corexa/corexa/runtime/daemon/internal/usecase/chat"
)

type Server struct {
	config      config.Config
	chatService chatusecase.Service
}

func NewServer(cfg config.Config, chatService chatusecase.Service) *http.Server {
	s := Server{
		config:      cfg,
		chatService: chatService,
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/v1/runtime/health", s.handleHealth)
	mux.HandleFunc("/v1/models", s.handleModels)
	mux.HandleFunc("/v1/workspaces/summary", s.handleWorkspaceSummary)
	mux.HandleFunc("/v1/chat/stream", s.handleChatStream)

	return &http.Server{
		Addr:    cfg.HTTPAddress(),
		Handler: mux,
	}
}

func (s Server) handleHealth(writer http.ResponseWriter, _ *http.Request) {
	writeJSON(writer, http.StatusOK, map[string]any{
		"status":      "ready",
		"provider":    "corexa-runtime",
		"version":     "0.1.0",
		"activeModel": s.config.DefaultModel,
	})
}

func (s Server) handleModels(writer http.ResponseWriter, _ *http.Request) {
	writeJSON(writer, http.StatusOK, []map[string]any{
		{
			"id":            s.config.DefaultModel,
			"provider":      "corexa-runtime",
			"family":        "corexa-code",
			"capabilities":  []string{"chat", "code"},
			"contextWindow": 8192,
			"local":         true,
		},
	})
}

func (s Server) handleWorkspaceSummary(writer http.ResponseWriter, _ *http.Request) {
	summary := workspace.Summary{
		ID:               "workspace-local",
		Name:             "Corexa Workspace",
		RootPath:         ".",
		Languages:        []string{"TypeScript", "Go", "Rust"},
		RepositoryStatus: "warm",
	}

	writeJSON(writer, http.StatusOK, summary)
}

func (s Server) handleChatStream(writer http.ResponseWriter, request *http.Request) {
	var payload struct {
		Prompt string `json:"prompt"`
	}

	_ = json.NewDecoder(request.Body).Decode(&payload)
	result, _ := s.chatService.Complete(request.Context(), domainchat.CompletionRequest{
		Model: s.config.DefaultModel,
		Messages: []domainchat.Message{
			{Role: "user", Content: payload.Prompt},
		},
	})

	writer.Header().Set("content-type", "application/x-ndjson")
	writeNDJSON(writer, map[string]any{
		"type":    "message.delta",
		"content": result,
	})
}

func writeJSON(writer http.ResponseWriter, statusCode int, payload any) {
	writer.Header().Set("content-type", "application/json")
	writer.WriteHeader(statusCode)
	_ = json.NewEncoder(writer).Encode(payload)
}

func writeNDJSON(writer http.ResponseWriter, payload any) {
	_ = json.NewEncoder(writer).Encode(payload)
}
