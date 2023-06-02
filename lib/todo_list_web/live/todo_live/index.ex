defmodule TodoListWeb.TodoLive.Index do
  use TodoListWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok, assign(socket, items: [])}
  end

  def handle_event("add_item", %{"user" => user, "work" => work}, socket) do
    item = %{user: user, work: work, completed: false}
    updated_items = [item | socket.assigns.items]
    {:noreply, assign(socket, items: updated_items)}
  end

  def handle_event("toggle_complete", %{"index" => index}, socket) do
    updated_items =
      Enum.map(socket.assigns.items, fn %{completed: completed} = item, i ->
        if String.to_integer(index) == i do
          %{item | completed: !completed}
        else
          item
        end
      end)

    {:noreply, assign(socket, items: updated_items)}
  end

  def handle_event("delete_item", %{"index" => index}, socket) do
    updated_items =
      socket.assigns.items
      |> List.delete_at(String.to_integer(index))

    {:noreply, assign(socket, items: updated_items)}
  end
end
