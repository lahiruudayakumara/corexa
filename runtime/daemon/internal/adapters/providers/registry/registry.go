package registry

import (
	"github.com/corexa/corexa/runtime/daemon/internal/adapters/providers/corexa"
	"github.com/corexa/corexa/runtime/daemon/internal/config"
	domain "github.com/corexa/corexa/runtime/daemon/internal/domain/model"
)

type Registry struct {
	Corexa corexa.Client
}

func New(cfg config.Config) Registry {
	return Registry{
		Corexa: corexa.New(cfg.InferenceURL),
	}
}

func (Registry) Models(defaultModel string) []domain.Descriptor {
	return []domain.Descriptor{
		{
			ID:            defaultModel,
			Provider:      "corexa-runtime",
			Family:        "corexa-code",
			ContextWindow: 8192,
			Capabilities:  []domain.Capability{domain.CapabilityChat, domain.CapabilityCode},
			Local:         true,
		},
	}
}
