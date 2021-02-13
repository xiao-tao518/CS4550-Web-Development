defmodule Practice.Palindrome do
  def palindrome?(w) do
    w == String.reverse(w)
  end
end
