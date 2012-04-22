package com.thekua.javascript.backend;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class Questions {
    private static final List<Question> QUESTIONS = Arrays.asList(
            new Question("What is the capital of France?","Paris"),
            new Question("What is the fourth highest mountain?","Lhotse"),
            new Question("hat is the smallest planet in the solar system?", "Mercury"));

    public static class Question {
        public final String question;
        public final String answer;

        public Question(String question, String answer) {
            this.question = question;
            this.answer = answer;
        }

    }

    public static Question random() {
        int random = new Random().nextInt(QUESTIONS.size());
        return QUESTIONS.get(random);
    }
}
