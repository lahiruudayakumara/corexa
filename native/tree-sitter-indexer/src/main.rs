use corexa_tree_sitter_indexer::summarize;

fn main() {
    let summary = summarize("typescript");
    println!("{}", serde_json::to_string_pretty(&summary).unwrap());
}
