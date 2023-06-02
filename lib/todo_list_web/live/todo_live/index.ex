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

  def handle_event("delete_item", %{"index" => index}, socket) do
    updated_items =
      socket.assigns.items
      |> List.delete_at(String.to_integer(index))

    {:noreply, assign(socket, items: updated_items)}
  end

  def handle_event(
        "reposition",
        %{"old" => old_index, "new" => new_index, "index" => _item_index},
        socket
      ) do
    updated_items =
      socket.assigns.items
      |> List.insert(
        new_index,
        List.delete_at(socket.assigns.items, String.to_integer(old_index))
      )

    {:noreply, assign(socket, items: updated_items)}
  end
end
