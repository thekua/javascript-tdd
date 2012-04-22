require 'webrick'

server = WEBrick::HTTPServer.new(
  :BindAddress     =>    "localhost",
  :Port            =>    8080,
)

class QuestionServlet < WEBrick::HTTPServlet::AbstractServlet
  QUESTIONS = [ ["What is the capital of France?", "Paris"],
                ["What is the fourth highest mountain?", "Lhotse"],
                ["What is the smallest planet in the solar system?", "Mecury"]]

  def do_GET(request, response)
     response.status = 200
     response['Content-Type'] = "text/plain"
     json = to_json(random_question_pair)
     response.body = json
  end

  private
  def to_json(question_answer)
   q = question_answer[0]
   a = question_answer[1]
   "{\"question\":\"#{q}\", \"answer\":\"#{a}\"}"
  end

  def random_question_pair
    length = QUESTIONS.length
    random = rand(length)
    QUESTIONS[random] 
  end
end

server.mount("/", QuestionServlet)

# handle signals
%w(INT).each do |signal|
   trap(signal) { server.shutdown }
end

server.start
