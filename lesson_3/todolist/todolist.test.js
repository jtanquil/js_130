const Todo = require('./todo');
const TodoList = require('./todolist');

describe('Todo', () => {
  let todo;

  beforeEach(() => {
    todo = new Todo('touch grass');
  });

  test('getTitle returns the title of the todo', () => {
    expect(todo.getTitle()).toBe('touch grass');
  });
})

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('calling toArray returns an array of todoList entries', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  })

  test('calling first returns the first todo', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('calling last returns the last todo', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('calling shift removes the first item in the list and returns it', () => {
    let listItem = list.shift();
    expect(listItem).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('calling pop removes the last item in the list and returns it', () => {
    let listItem = list.pop();
    expect(listItem).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('calling isDone returns true if all the items are done, false otherwise', () => {
    expect(list.isDone()).toBe(false);
    todo1.markDone();
    expect(list.isDone()).toBe(false);
    todo2.markDone();
    expect(list.isDone()).toBe(false);
    todo3.markDone();
    expect(list.isDone()).toBe(true);
  });

  test('add will throw a TypeError if you attempt to add a non-Todo object', () => {
    expect(() => list.add(1)).toThrow(TypeError);
    expect(() => list.add({})).toThrow(TypeError);
    expect(() => list.add(new Todo('touch grass'))).not.toThrow(TypeError);
  });

  test('itemAt will return the item at the given index', () => {
    expect(() => list.itemAt(10)).toThrow(ReferenceError);
    expect(list.itemAt(0)).toEqual(todo1);
  });

  test('markDoneAt will mark done the item at the given index', () => {
    list.markDoneAt(1);
    expect(list.itemAt(0).isDone()).toBe(false);
    expect(list.itemAt(1).isDone()).toBe(true);
    expect(list.itemAt(2).isDone()).toBe(false);

    expect(() => list.markDoneAt(10)).toThrow(ReferenceError);
  });

  test('markUndoneAt will mark undone the item at the given index', () => {
    list.markDoneAt(0);
    list.markDoneAt(1);
    list.markDoneAt(2);
    list.markUndoneAt(1);
    expect(list.itemAt(0).isDone()).toBe(true);
    expect(list.itemAt(1).isDone()).toBe(false);
    expect(list.itemAt(2).isDone()).toBe(true);

    expect(() => list.markUndoneAt(17)).toThrow(ReferenceError);
  });

  test('markAllDone will mark every item done', () => {
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  });

  test('markAllUndone will mark every item undone', () => {
    list.markAllDone();
    list.markAllUndone();

    expect(list.allDone().toArray()).toEqual([]);
  });

  test('removeAt will remove the item at the given index', () => {
    expect(list.removeAt(1)).toEqual(todo2);
    expect(list.toArray()).toEqual([todo1, todo3]);

    expect(() => list.removeAt(6)).toThrow(ReferenceError);
  });

  test('toString returns string representation of the list', () => {
    let string =
      `---- Today's Todos ----\n[ ] Buy milk\n[ ] Clean room\n[ ] Go to the gym`;
  
    expect(list.toString()).toBe(string);
  });

  test('toString marks done items as being done', () => {
    let string =
      `---- Today's Todos ----\n[ ] Buy milk\n[X] Clean room\n[ ] Go to the gym`;

    list.markDoneAt(1);
    expect(list.toString()).toBe(string);
  });

  test('toString marks all items as being done when they are all done', () => {
    let string =
      `---- Today's Todos ----\n[X] Buy milk\n[X] Clean room\n[X] Go to the gym`;

    list.markAllDone();
    expect(list.toString()).toBe(string);
  });

  test('forEach iterates over the todo items', () => {
    let listItems = [];
    list.forEach((todo) => listItems.push(todo));

    expect(listItems).toEqual([todo1, todo2, todo3]);
  });

  test('filter returns todo items that satisfy a condition', () => {
    list.markDoneAt(1);
    list.markDoneAt(2);

    expect(list.filter((todo) => todo.isDone()).toArray()).toEqual([todo2, todo3]);
  });
  
  test('findByTitle returns the todo item with the matching title', () => {
    expect(list.findByTitle('Buy milk')).toEqual(todo1);
    expect(list.findByTitle('touch grass')).toBe(undefined);
  });

  test('allDone returns all items that are done', () => {
    list.markDoneAt(1);

    expect(list.allDone().toArray()).toEqual([todo2]);
  });

  test('allNotDone returns all items that are not done', () => {
    list.markDoneAt(1);

    expect(list.allNotDone().toArray()).toEqual([todo1, todo3]);
  });

  test('markDone marks the item with the given title done', () => {
    list.markDone('Buy milk');
    expect(list.itemAt(0).isDone()).toBe(true);
  });
});
