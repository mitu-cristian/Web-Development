import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";
import Header from "./components/Header";
import Clients from "./components/Clients"; 

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache()
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header/>
        <div className="container">
          <Clients/>
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
