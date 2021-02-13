defmodule Practice.Calc do
  def parse_float(text) do
    {num, _} = Float.parse(text)
    num
  end
  
  @precedence %{
     "+" => 1,
     "-" => 1,
     "*" => 2,
     "/" => 2
     }
     
  defp parse("+") do
    "+"
  end
  
  defp parse("-") do
    "-"
  end
  
  defp parse("*") do
    "*"
  end
  
  defp parse("/") do
    "/"
  end
  
  defp parse(num) do
    parse_float(num)
  end
  
  defp eval(a, op, b) do
    #a = parse_float(a)
    #b = parse_float(b)
    case op do
      "+" -> a + b
      "-" -> a - b
      "*" -> a * b
      "/" -> a / b
    end
  end
  
  
  defp eval_expr([a, op, b | tail]) do
    case tail do
      [op2, c | rest] ->
        if @precedence[op] < @precedence[op2] do
          eval_expr([a, op, eval(b, op2, c) | rest])
        else
          eval_expr([eval(a, op, b), op2, c | rest])
        end
      [] -> eval(a, op, b)
    end
  end
  
  defp eval_expr([a]) do
    a
  end

  def calc(expr) do
    expr
    |> String.split(~r/\s+/)
    |> Enum.map(&parse/1)
    |> eval_expr
  end
end
