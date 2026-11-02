import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AddNote from "./pages/AddNote";
import RegisterPage from "./pages/RegisterPage";
import { getAccessToken, getUserLogged, putAccessToken } from "./utils/api";
import { LocaleProvider } from "./contexts/LocaleContext";
import Navigation from "./components/Navigation";
import DetailsNote from "./pages/DetailsNote";
import ToggleTheme from "./components/ToggleTheme";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggleTheme = this.toggleTheme.bind(this);
    this.state = {
      authedUser: null,
      initializing: true,
      theme: localStorage.getItem("theme") || "dark",

      localeContext: {
        locale: localStorage.getItem("locale") || "id",
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale = prevState.localeContext.locale === "id" ? "en" : "id";

            localStorage.setItem("locale", newLocale);

            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale,
              },
            };
          });
        },
      },
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    try {
      const accessToken = getAccessToken();

      if (!accessToken) {
        return;
      }

      const { error, data } = await getUserLogged();

      if (!error) {
        this.setState({ authedUser: data });
      } else {
        putAccessToken("");
      }
    } catch (error) {
      console.error("Gagal memeriksa sesi login:", error);
      putAccessToken("");
    } finally {
      this.setState({ initializing: false });
    }
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);

    const { error, data } = await getUserLogged();

    if (!error) {
      this.setState({
        authedUser: data,
      });
    }
  }

  onLogout() {
    this.setState({
      authedUser: null,
    });

    putAccessToken("");
  }
  toggleTheme() {
    this.setState((prevState) => {
      const newTheme = prevState.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);

      return {
        theme: newTheme,
      };
    });
  }
  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <LocaleProvider value={this.state.localeContext}>
          <div className="contact-app">
            <header className="contact-app__header">
              <h1>Aplikasi Catatan</h1>
            </header>

            <main>
              <Routes>
                <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </LocaleProvider>
      );
    }

    return (
      <LocaleProvider value={this.state.localeContext}>
        <div className="app-container" data-theme={this.state.theme}>
          <header className="app-header">
            <h1>{this.state.localeContext.locale === "id" ? "Aplikasi Catatan" : "Notes App"}</h1>
            <ToggleTheme theme={this.state.theme} toggleTheme={this.toggleTheme} />
            <Navigation logout={this.onLogout} name={this.state.authedUser.name} />
          </header>

          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/add" element={<AddNote />} />
              <Route path="/notes/:id" element={<DetailsNote />} />
            </Routes>
          </main>
        </div>
      </LocaleProvider>
    );
  }
}

export default App;
