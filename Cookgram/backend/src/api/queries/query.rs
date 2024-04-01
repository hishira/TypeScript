pub trait Query {
    fn build(&self) -> String;
}