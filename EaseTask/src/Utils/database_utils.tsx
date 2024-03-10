import { useEffect } from 'react';
import * as SQLite from 'expo-sqlite'; 
import { useState } from 'react';


// Opens or creates the database
export const database = SQLite.openDatabase('EaseTask.db');

export const databaseInit = async () => {
  try {
    await database.transaction(async tx => {
      await tx.executeSql(
        "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, priority TEXT, year INTEGER, month INTEGER, day INTEGER, time TEXT, isChecked INTEGER, text TEXT);"
      );
      await tx.executeSql(
        "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, priority TEXT, year INTEGER, month INTEGER, day INTEGER, time TEXT, isChecked INTEGER, location TEXT, text TEXT);"
      );
      await tx.executeSql(
        "CREATE TABLE IF NOT EXISTS tags (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, color TEXT);"
      );

        //createTask("Test 1", "priority 1", 2024, 2, 12, "8:30 PM", "This is a task");
        //createTask("Test 2", "priority 3", 2024, 2, 15, "5:30 AM", "This is a task");
        //createTask("Test 3", "priority 2", 2024, 2, 15, "6:15 PM", "This is a task");

        //createNote("Note 1", "priority 1", 2024, 2, 16, "10:30 AM", "Stockholm", "This is a new note");
        //createNote("Note 2", "priority 2", 2024, 2, 20, "11:45 PM", "Upsalla", "This is a new note")
    });
  }catch (error) {
    console.error("Database initialization failed:", error);
  }
};

// Deletes all the tasks/notes
export const deleteAllDataFromTable = (tablename) => {
  database.transaction(
    (tx) => {
      tx.executeSql('DELETE FROM ' + tablename, [], (_, result) => {
        console.log('All data deleted from the table');
      });
    },
    (error) => {
      console.error('Error deleting data:', error);
    }
  );
};


/* Tasks */


// Insert a new task into the table
export const createTask = (name, priority, year, month, day, time, text) => {
  database.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO tasks (name, priority, year, month, day, time, isChecked, text) VALUES (?,?,?,?,?,?,0,?);',
      [name, priority, year, month, day, time, text],
      (_, result) => {
        console.log('Task created successfully');
      },
      (_, error) => {
        console.error('Error creating task:', error);
        return true; // line to satisfy the required signature
      }
    );
  });
};

// Print all tasks in the console
export const printAllTasks = () => {
  database.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM tasks;',
      [],
      (_, { rows }) => {
        console.log(rows._array);
      }
    );
  });
}

// Get all tasks (with a callback function)
export const getAllTasks = (callback) => {
  database.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM tasks;',
      [],
      (_, { rows }) => {
        const tasks = rows._array.map(row => ({
          id: row.id,
          name: row.name,
          priority: row.priority,
          year: row.year,
          month: row.month,
          day: row.day,
          time: row.time,
          isChecked: row.isChecked === 1, // Convert SQLite INTEGER to boolean
          text: row.text,
        }));
        callback(tasks);
      }
    );
  });
}

// Switches a task to completed or uncompleted
export const toggleTaskChecked = (task) => {
  const newCheckedValue = task.isChecked ? 0 : 1; // Toggle isChecked value

  database.transaction(tx => {
    tx.executeSql(
      'UPDATE tasks SET isChecked = ? WHERE id = ?;',
      [newCheckedValue, task.id],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          console.log(`Task ${task.id} isChecked updated to ${newCheckedValue}`);
        } else {
          console.log(`No task found with ID ${task.id}`);
        }
      }
    );
  });
}

// Delete a specific task from the table
export const deleteTask = (taskId) => {
  database.transaction(
    (tx) => {
      tx.executeSql(
        'DELETE FROM tasks WHERE id = ?',
        [taskId],
        (_, result) => {
          console.log('Task deleted successfully');
        }
      );
    },
    (error) => {
      console.error('Error deleting task:', error);
    }
  );
};

/* Notes */


// Insert a new note into the table
export const createNote = (name, priority, year, month, day, time, location, text) => {
  database.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO notes (name, priority, year, month, day, time, location, text, isChecked) VALUES (?,?,?,?,?,?,?,?,0);',
      [name, priority, year, month, day, time, location, text],
      (_, result) => {
        console.log('Note created successfully');
      },
      (_, error) => {
        console.error('Error creating note:', error);
        return true; // line to satisfy the required signature
      }
    );
  });
};

// Print all notes in the console
export const printAllNotes = () => {
  database.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM notes;',
      [],
      (_, { rows }) => {
        console.log(rows._array);
      }
    );
  });
}

// Get all notes (with a callback function)
export const getAllNotes = (callback) => {
  database.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM notes;',
      [],
      (_, { rows }) => {
        const notes = rows._array.map(row => ({
          id: row.id,
          name: row.name,
          priority: row.priority,
          year: row.year,
          month: row.month,
          day: row.day,
          time: row.time,
          text: row.text,
          location: row.location,
          isChecked: row.isChecked === 1, // Convert SQLite INTEGER to boolean
        }));
        callback(notes);
      }
    );
  });
}

// Switches a note to completed or uncompleted
export const toggleNoteChecked = (note) => {
  const newCheckedValue = note.isChecked ? 0 : 1; // Toggle isChecked value

  database.transaction(tx => {
    tx.executeSql(
      'UPDATE notes SET isChecked = ? WHERE id = ?;',
      [newCheckedValue, note.id],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          console.log(`Note ${note.id} isChecked updated to ${newCheckedValue}`);
        } else {
          console.log(`No note found with ID ${note.id}`);
        }
      }
    );
  });
}

// Delete a specific note from the table
export const deleteNote = (noteId) => {
  database.transaction(
    (tx) => {
      tx.executeSql(
        'DELETE FROM notes WHERE id = ?',
        [noteId],
        (_, result) => {
          console.log('Note deleted successfully');
        }
      );
    },
    (error) => {
      console.error('Error deleting note:', error);
    }
  );
};