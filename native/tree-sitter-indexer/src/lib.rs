use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SymbolRecord {
    pub kind: String,
    pub start_line: usize,
    pub end_line: usize,
    pub text: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ParseSummary {
    pub language: String,
    pub symbol_count: usize,
    pub symbols: Vec<SymbolRecord>,
}

pub fn summarize(language: &str) -> ParseSummary {
    ParseSummary {
        language: language.to_string(),
        symbol_count: 0,
        symbols: Vec::new(),
    }
}
