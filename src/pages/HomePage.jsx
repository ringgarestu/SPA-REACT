import React from "react";
import { getActiveNotes, deleteNote } from "../utils/api";
import SearchBar from "../components/SearchBar";
import { LocaleConsumer } from "../contexts/LocaleContext";
import NoteList from "../components/NoteList";
import { Link, useSearchParams } from "react-router-dom";

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword");

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />;
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      keyword: props.defaultKeyword || "",
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  async componentDidMount() {
    const { error, data } = await getActiveNotes();

    // console.log("hasil api note", data);
    if (!error) {
      this.setState({
        notes: data,
      });
    }
  }

  async onDeleteHandler(id) {
    const { error } = await deleteNote(id);

    if (!error) {
      const { data } = await getActiveNotes();

      this.setState({
        notes: data,
      });
    }
  }

  onKeywordChangeHandler(keyword) {
    this.setState({
      keyword,
    });

    this.props.keywordChange(keyword);
  }

  render() {
    const notes = this.state.notes.filter((note) => {
      return note.title.toLowerCase().includes(this.state.keyword.toLowerCase());
    });

    return (
      <LocaleConsumer>
        {({ locale }) => (
          <section>
            <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
            <Link to="/add">Tambah catatan</Link>
            <h2>{locale === "id" ? "Daftar Catatan" : "Note List"}</h2>
            <NoteList notes={notes} onDelete={this.onDeleteHandler} />
          </section>
        )}
      </LocaleConsumer>
    );
  }
}

export default HomePageWrapper;
