defmodule Bulls.Game do

  defp update_status(guess, secret) do
    ls = String.graphemes(secret)
    lg = String.graphemes(guess)
    Enum.zip(ls, lg)
    |> Enum.reduce(%{right_place: 0, wrong_place: 0}, fn {s, g}, 
        %{right_place: bull, wrong_place: cow} ->
      cond do
        g == s -> %{right_place: bull + 1, wrong_place: cow}
        g in ls -> %{right_place: bull, wrong_place: cow + 1}
        true -> %{right_place: bull, wrong_place: cow}
      end
    end)
    |> Map.put(:guess, guess)
  end
  
  def new do
    %{
      secret: generate_secret(),
      guesses: MapSet.new,
      info: ""
    }
  end
  
    
  defp is_win(st), do: st.secret in st.guesses
  
  defp is_lose(st), do: MapSet.size(st.guesses) >= 8
  


  def view(st) do
    success = is_win(st)
    %{
      won: success,
      lost: is_lose(st) and not success,
      info: Map.get(st, :info, ""),
      guesses: Enum.map(st.guesses, &(update_status(&1, st.secret)))
    }
  end
  
  defp generate_secret do
    secret = Enum.join(Enum.take_random(0..9, 4))
  end
  

  def guess(st, num) do
    digit_list = String.graphemes(num)
    cond do
      is_win(st) ->
        %{st | info: "You Win"}
      is_lose(st) ->
        %{st | info: "You Lost."}
      true -> %{st | guesses: MapSet.put(st.guesses, num), info: ""}
    end
  end


end
