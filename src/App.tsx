import { Link, useRoutes } from "react-router";
import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";
import { Button } from "./components/ui/button";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      {/* Top bar */}
      <div className="bg-gray-100 border-b">
        <nav className="container mx-auto flex justify-between items-center py-4 px-4">
          <ul className="flex items-center gap-4">
            <li>
              <strong className="text-lg font-bold">Creatorverse</strong>
            </li>
          </ul>
          <ul className="flex items-center gap-6">
            <li>
              <a
                href="/"
                data-link
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/creators/new"
                data-link
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Add Creator
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <main className="container mx-auto flex-1 py-6 px-4">{children}</main>
    </div>
  );
}

export default function App() {
  const element = useRoutes([
    {
      path: "/",
      element: (
        <Layout>
          <ShowCreators />
        </Layout>
      ),
    },
    {
      path: "/creators/new",
      element: (
        <Layout>
          <AddCreator />
        </Layout>
      ),
    },
    {
      path: "/creators/:id",
      element: (
        <Layout>
          <ViewCreator />
        </Layout>
      ),
    },
    {
      path: "/creators/:id/edit",
      element: (
        <Layout>
          <EditCreator />
        </Layout>
      ),
    },
    {
      path: "*",
      element: (
        <Layout>
          <div className="container">
            <h3>Not Found</h3>
            <Button>
              <Link to="/">Go Home</Link>
            </Button>
          </div>
        </Layout>
      ),
    },
  ]);
  return element;
}
