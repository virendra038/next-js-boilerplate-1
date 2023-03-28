import useSwr from "swr";
import type { TodoData } from "../types/todo.type";
import axios from "axios";

export const useTodoById = (id: string) => {
    const { data, isLoading, error, mutate } = useSwr<TodoData>("todoById", async () => {
        const { data } = await axios.get(`/api/todo/${id}`);
        return data;
    }
    );
    return { todo: data, isLoading, error, mutate };
};