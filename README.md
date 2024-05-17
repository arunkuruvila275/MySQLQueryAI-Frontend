
# MySQLQueryAI Frontend

MySQLQueryAI Frontend is a React application that interacts with the MySQLQueryAI Backend to allow users to input natural language queries, generate SQL queries, execute them, and get explanations for SQL queries.

## Features

- **Database Connection**: Input fields to connect to a MySQL database.
- **Natural Language Querying**: Input field to enter natural language queries.
- **SQL Generation**: Generate SQL queries from natural language queries.
- **Query Execution**: Execute SQL queries and display results.
- **Query Explanation**: Explain SQL queries in natural language.

## Prerequisites

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/mysqlqueryai-frontend.git
    cd mysqlqueryai-frontend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the React development server:
    ```sh
    npm start
    ```

2. The application will be available at `http://localhost:3000`.

## Project Structure

```
mysqlqueryai-frontend/
│
├── public/                 # Public assets and the HTML file
├── src/                    # Source files
│   ├── components/         # React components
│   │   ├── ConnectionForm.js     # Form to connect to the database
│   │   ├── QueryInput.js         # Component to input natural language queries
│   │   └── QueryResults.js       # Component to display SQL query results and explanations
│   ├── App.js              # Main App component
│   ├── index.js            # Entry point for React
│   └── styles.css          # Custom styles
├── .gitignore              # Git ignore file
├── package.json            # npm configuration and dependencies
└── README.md               # Project documentation
```

## Components

### ConnectionForm

`ConnectionForm.js` handles the connection to the MySQL database. It includes input fields for the username, password, hostname, and database name.

### QueryInput

`QueryInput.js` provides an input field for entering natural language queries and buttons to generate SQL queries and execute them.

### QueryResults

`QueryResults.js` displays the generated SQL query and the results of executing the SQL query. It also provides an option to explain the SQL query in natural language.

## Example Workflow

1. **Connect to the Database**:
    - Enter your database credentials (username, password, hostname, database name) and click "Connect".
2. **Enter a Natural Language Query**:
    - Type your query in plain English into the input field.
3. **Generate SQL**:
    - Click the "Generate SQL" button to convert the natural language query into an SQL query.
4. **Execute SQL**:
    - Click the "Execute" button to run the generated SQL query and view the results.
5. **Explain SQL**:
    - Click the "Explain Query" button under the generated SQL query to get a natural language explanation of the SQL query.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI API](https://beta.openai.com/docs/)
