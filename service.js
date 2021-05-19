angular.module('todo').factory('todoStorage', function(){
  var TODO_DATA='TODO_DATA';
  var storage = { 
      todos:[ 
        /*
      {
      title : '코딩 준비',
      completed : false,
      createdAt : Date.now()
    },
      {
      title : '앵귤러 학습',
      completed : false,
      createdAt : Date.now()
    },
      {
      title : '운동하기',
      completed : false,
      createdAt : Date.now()
    }
    */
    ],

    _saveToLocalStorage: function(data){
      //_로 시작하는 것은 private 의미
      localStorage.setItem('TODO_DATA', JSON.stringify(data))
  },

  _getFromLocalStorage : function(){
      return JSON.parse(localStorage.getItem(TODO_DATA)) || [];
      //아무것도 없는 경우에는 빈 배열이라도 보내야 하기 때문에 || [] 부분 필요
  },

    get: function(){
      //storage.todos = storage._getFromLocalStorage();
      angular.copy(storage._getFromLocalStorage(), storage.todos)
      return storage.todos;
    },

    remove : function(todo){
       var index = storage.todos.findIndex(function(item){
        return item.title == todo.title;
      })

      if(index >-1){
        storage.todos.splice(index,1)
        storage._saveToLocalStorage(storage.todos);
      }
    },

     add : function(newTodoTitle){
         //새로운 todo를 만들고
      var newTodo = {
      title : newTodoTitle,
      completed : false,
      createdAt : Date.now()
      }
      //기존 todos에 추가 
      storage.todos.push(newTodo);
      storage._saveToLocalStorage(storage.todos);
     },

     update : function(){
    storage._saveToLocalStorage(storage.todos);
    
  }


  }

  
  return storage;
});

