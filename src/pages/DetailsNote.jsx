import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getNote, deleteNote } from "../utils/api";
import DetailsItem from "../components/DetailsItem";

function DetailsNoteWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();

  return <DetailsNote id={id} navigate={navigate} />;
}

class DetailsNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: null,
      loading: true,
      error: false,
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
  }

  async componentDidMount() {
    const { error, data } = await getNote(this.props.id);

    if (!error) {
      this.setState({
        note: data,
        loading: false,
      });
    } else {
      this.setState({
        error: true,
        loading: false,
      });
    }
  }

  async onDeleteHandler(id) {
    const { error } = await deleteNote(id);

    if (!error) {
      this.props.navigate("/");
    }
  }

  render() {
    const { note, loading, error } = this.state;

    if (loading) {
      return <p>Memuat detail catatan...</p>;
    }

    if (error || !note) {
      return (
        <section>
          <p>Catatan tidak ditemukan.</p>
          <Link to="/">Kembali ke daftar catatan</Link>
        </section>
      );
    }

    return (
      <section>
        <Link to="/">← Kembali ke daftar catatan</Link>

        <DetailsItem {...note} onDelete={this.onDeleteHandler} />
      </section>
    );
  }
}

export default DetailsNoteWrapper;
