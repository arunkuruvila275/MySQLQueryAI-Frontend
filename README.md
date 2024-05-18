
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

1. **Start the React development server:**
    ```sh
    npm start
    ```

2. **The application will be available at:**
    - http://localhost:3000

## Example Workflow

1. **Connect to the Database:**

    - Enter the database connection details: Username, Password, Hostname, Database, and Enable SSL (optional).
    - Click the `Connect` button.


2. **Relearn the Model with Database Structure:**

    - Click the `Relearn DB Schema` button to reinform OpenAI about the database structure.


3. **Generate SQL Query:**

    - Enter your natural language query in the input box.
    - Click the `Generate SQL` button to generate the corresponding SQL query.


4. **Execute SQL Query:**

    - Click the `Execute` button to execute the SQL query on the database.


5. **Explain SQL Query:**

    - Click the `Explain SQL` button under the generated SQL query to translate it back to natural language.


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

`ConnectionForm.js` handles the connection to the MySQL database. It includes input fields for the username, password, hostname, database name and enable SSL(optional)

### QueryInput

`QueryInput.js` provides an input field for entering natural language queries and buttons to generate SQL queries and execute them.

### QueryResults

`QueryResults.js` displays the generated SQL query and the results of executing the SQL query. It also provides an option to explain the SQL query in natural language.


## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI API](https://beta.openai.com/docs/)

## Screenshots

1. **MySQL Query AI - Database Connection**

![Screenshot of the application](https://github.com/arunkuruvila275/MySQLQueryAI-Frontend/blob/master/pictures/FrontEnd%201.png)

2. **MySQL Query AI - Query Executor**

![Screenshot of the application](https://github.com/arunkuruvila275/MySQLQueryAI-Frontend/blob/master/pictures/FrontEnd%202.png)


