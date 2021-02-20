defmodule BullsWeb.GameChannel do
  
  # this is from CS4550 lecture code
  
  use BullsWeb, :channel

  @impl true
  def join("game:" <> _id, payload, socket) do
    if authorized?(payload) do
      game = Bulls.Game.new()
      socket = assign(socket, :game, game)
      view = Bulls.Game.view(game)
      {:ok, view, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  @impl true
  def handle_in("guess", %{"number" => n}, socket) do
    game0 = socket.assigns[:game]
    game1 = Bulls.Game.guess(game0, n)
    socket = assign(socket, :game, game1)
    view = Bulls.Game.view(game1)
    {:reply, {:ok, view}, socket}
  end

  @impl true
  def handle_in("reset", _, socket) do
    game = Bulls.Game.new()
    socket = assign(socket, :game, game)
    view = Bulls.Game.view(game)
    {:reply, {:ok, view}, socket}
  end

  defp authorized?(_payload) do
    true
  end
end
