defmodule Practice.Factors do
  def factor(n) do
    int_n = String.to_integer(n)
    factor_helper(int_n, 2)
  end
  
  defp factor_helper(n, temp) do
    cond do
      n < temp * temp -> [n]
      rem(n, temp) == 0 -> [temp | factor_helper(div(n, temp), temp)]
      true -> factor_helper(n, temp + 1)
    end
  end
end
