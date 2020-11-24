const {createTask, deleteTask, updateTask} = require('../controller/taskController')

test('get task created', () => {
    expect(typeof createTask()).toBe('object');
  });

test('delete task', () => {
    expect(typeof deleteTask()).toMatch('object');
});

test('update task', () => {
    expect(typeof updateTask()).toMatch('object');
})