package chat

import (
	"context"

	domain "github.com/corexa/corexa/runtime/daemon/internal/domain/chat"
)

type Provider interface {
	Complete(ctx context.Context, request domain.CompletionRequest) (string, error)
}

type Service struct {
	provider Provider
}

func NewService(provider Provider) Service {
	return Service{provider: provider}
}

func (s Service) Complete(ctx context.Context, request domain.CompletionRequest) (string, error) {
	return s.provider.Complete(ctx, request)
}
