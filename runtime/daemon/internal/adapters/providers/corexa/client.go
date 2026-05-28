package corexa

import (
	"context"

	domain "github.com/corexa/corexa/runtime/daemon/internal/domain/chat"
)

type Client struct {
	BaseURL string
}

func New(baseURL string) Client {
	return Client{BaseURL: baseURL}
}

func (c Client) Complete(_ context.Context, request domain.CompletionRequest) (string, error) {
	model := request.Model
	if model == "" {
		model = "corexa-code-fast"
	}

	return "corexa runtime placeholder response from " + model + " via corexa inference engine", nil
}
