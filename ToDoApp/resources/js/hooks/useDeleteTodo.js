// TODOを削除
const useDeleteTodo = (id) => {
    
    const deleteTodo = async () => {
        await axios.delete(`/api/delete/todo/${id}`).then(res => {        
            
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    deleteTodo();
};

export default useDeleteTodo;