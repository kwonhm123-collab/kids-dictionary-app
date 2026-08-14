window.pronunciationDisplayOverrides = window.pronunciationDisplayOverrides || {};
for (const [word, reasonInfo] of Object.entries({
  "a lot of": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "according to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "account for": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "adapt to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "adhere to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "af": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "agree with": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "aj": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ak": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "all of a sudden": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "all right": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ameba": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ammonic": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "amoebaean": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "amorality": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "amount to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "amphibiously": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ampleness": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "amylose": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "anabena": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "anachronistically": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "anachrony": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "anagogical": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "anagogically": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "anagogy": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "anagrammatically": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "anagrammatist": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "andale": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "any more": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "apart from": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "appeal to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "apply for": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "approve of": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "approx": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "archae": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "arise from": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "as a result": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "as soon as": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "as well as": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "asin": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ask for": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "associate with": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "at least": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "at the moment": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "avg": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "az": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "back up": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "bb": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "be able to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "be aware of": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "be based on": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "be concerned about": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "be concerned with": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "be different from": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "be famous for": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "be full of": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "be going to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "be good at": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "be interested in": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "be likely to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "be responsible for": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "be supposed to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "be used to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "be willing to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "because of": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "belong to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "benefit from": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "biol": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "bk": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "bm": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "br": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "break down": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "brian": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "bring about": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "bring up": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "by the way": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "call for": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "calm down": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "carry out": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "cf": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "cfr": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "cg": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ch": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "check in": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "check out": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "cheer up": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ci": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "cl": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "clean up": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "cm": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "cn": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "cnet": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "collectables": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "come across": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "come from": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "come true": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "come up with": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "config": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "consist of": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "const": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "contribute to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "cope with": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "cr": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "cs": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "css": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ct": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "cu": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "cut down on": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "cvs": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "db": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ddr": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "deal with": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "decision-making": {
    "unavailableReason": "하이픈 결합어의 독립 IPA 자료가 없어 지역별 전체 단어 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "depend on": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "derive from": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "des": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "devel": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "diego": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "differ from": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "dir": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "dist": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "distinguish from": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "dl": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "do one's best": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "dont": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "downloadable": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "dp": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "drop by": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ds": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "du": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "due to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "dv": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ea": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ebook": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ebooks": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ecommerce": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "eg": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "endif": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "england": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "eq": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "es": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "eur": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "exp": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "expansys": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ext": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ff": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "fg": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "figure out": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "fill out": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "find out": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "fl": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "focus on": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "follow up": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "for example": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "foto": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "fotos": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "fr": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "francisco": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "freebsd": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "fri": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ft": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "full-time": {
    "unavailableReason": "하이픈 결합어의 독립 IPA 자료가 없어 지역별 전체 단어 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "fw": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "fwd": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "gamecube": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "gamespot": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "gb": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "gba": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "gbp": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "gc": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "gcc": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ge": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "get along with": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "get in touch with": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "get ready": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "get rid of": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "get up": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "get used to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ghz": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "gis": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "give up": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "go on": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "go over": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "gpl": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "gr": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "gs": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "gt": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "guestbook": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "hand over": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "hang out": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "have to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "have trouble": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "hb": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "hear from": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "high-profile": {
    "unavailableReason": "하이픈 결합어의 독립 IPA 자료가 없어 지역별 전체 단어 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "hold on": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "holdem": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "howto": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "hr": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "hrs": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "hs": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ht": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "hwy": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ic": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ice cream": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "icq": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ie": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ii": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "illinois": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "in addition to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "in advance": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "in contrast to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "in fact": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "in front of": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "in general": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "in order to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "in particular": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "in spite of": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "in terms of": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "in time": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "instead of": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "int": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ir": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ist": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ix": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "jc": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "jd": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "jelsoft": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "jm": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "jpg": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "jvc": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "kb": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "kde": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "keep an eye on": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "keep in mind": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "keep in touch": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "kelly": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "kg": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "km": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "kong": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ks": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ky": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "large-scale": {
    "unavailableReason": "하이픈 결합어의 독립 IPA 자료가 없어 지역별 전체 단어 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "lc": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ld": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "lead to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "let down": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "lg": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "listen to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ll": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "loc": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "log in": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "log out": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "long-standing": {
    "unavailableReason": "하이픈 결합어의 독립 IPA 자료가 없어 지역별 전체 단어 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "long-term": {
    "unavailableReason": "하이픈 결합어의 독립 IPA 자료가 없어 지역별 전체 단어 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "look after": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "look for": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "look forward to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "look like": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "look up": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "lots of": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "louis": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "lt": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "make a decision": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "make a mistake": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "make progress": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "make sense": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "make sure": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "make-up": {
    "unavailableReason": "하이픈 결합어의 독립 IPA 자료가 없어 지역별 전체 단어 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "mb": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "medline": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ment": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "mf": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "mg": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "mhz": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "miami": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "misc": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "missouri": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ml": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "mlb": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "mls": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "mn": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "motorola": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "move on": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "mozilla": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "msn": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "mt": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "mw": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "mysql": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "nc": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "nd": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ne": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "next to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "nh": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "nhl": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "nj": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "nl": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "nm": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "nn": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "no longer": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "no one": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "nokia": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "np": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "nr": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ns": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "nsw": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "nt": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "nv": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "nw": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ny": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "nyc": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "nz": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "o'clock": {
    "unavailableReason": "축약형·소유격의 독립 IPA 자료가 없어 지역별 전체 단어 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "object to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "oc": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "oclc": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "oem": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "offboarding": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "old-fashioned": {
    "unavailableReason": "하이픈 결합어의 독립 IPA 자료가 없어 지역별 전체 단어 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "on behalf of": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "on purpose": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "on time": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "onboarding": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "once in a while": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ooo": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "out of order": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "owing to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "oz": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "panasonic": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "part-time": {
    "unavailableReason": "하이픈 결합어의 독립 IPA 자료가 없어 지역별 전체 단어 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "pass away": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "paypal": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "pci": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "pd": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "pennsylvania": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "per cent": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "phentermine": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "phys": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "pick up": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "pl": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "plenty of": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "pmc": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "pmid": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "point out": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "pp": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ppc": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "prev": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "proc": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "prot": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "psp": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "pt": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "pts": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "pubmed": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "put off": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "put on": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "qty": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "rd": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "reach out": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "refer to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "regardless of": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "rely on": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "result from": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "result in": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "rf": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "rfc": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "rh": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "roll out": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "rs": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "rt": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "run into": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "run out of": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "rw": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "samsung": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "sb": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "sc": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "scotland": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "sd": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "set up": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "sg": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "short-term": {
    "unavailableReason": "하이픈 결합어의 독립 IPA 자료가 없어 지역별 전체 단어 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "show up": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "showtimes": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "shut down": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "sign off": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "signup": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "sitemap": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "sk": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "sku": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "sl": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "slideshow": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "slow down": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "sm": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "so as to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "so-called": {
    "unavailableReason": "하이픈 결합어의 독립 IPA 자료가 없어 지역별 전체 단어 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "sony": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "sooner or later": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "sp": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "speed up": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "sq": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "src": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ssl": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "stand out": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ste": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "stick to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "struct": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "succeed in": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "such as": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "suffer from": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "suse": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "sw": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "sys": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "t-shirt": {
    "unavailableReason": "하이픈 결합어의 독립 IPA 자료가 없어 지역별 전체 단어 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "take a break": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "take a chance": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "take a look": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "take advantage of": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "take care of": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "take into account": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "take off": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "take part in": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "take place": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "talk about": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "tc": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "tcp": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "tend to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "tgp": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "think about": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "thought-provoking": {
    "unavailableReason": "하이픈 결합어의 독립 IPA 자료가 없어 지역별 전체 단어 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "thu": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "tion": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "tn": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "to some extent": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "tp": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "tr": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "trackback": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "trackbacks": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "tramadol": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "transexual": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "travesti": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "tripadvisor": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "try out": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "tt": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "turn into": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "turn off": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "turn on": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "turn out": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "twiki": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "tx": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "uc": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "une": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "univ": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "up to date": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "ups": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "urw": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "usc": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "usd": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "used to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "usr": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "utah": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "utils": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "vb": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "verzeichnis": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "vii": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "virginia": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "vol": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "vt": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "wait for": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "webshots": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "well-being": {
    "unavailableReason": "하이픈 결합어의 독립 IPA 자료가 없어 지역별 전체 단어 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "whatelse": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "wi": {
    "unavailableReason": "약어·문자 표기는 용도에 따라 읽는 방식이 달라 단일 IPA를 표시하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "with regard to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "work on": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "work out": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "would like to": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "wp": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "wrap up": {
    "unavailableReason": "숙어·구는 단일 IPA 대신 미국식·영국식 전체 표현 듣기를 제공해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "wv": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "xbox": {
    "unavailableReason": "고유명사는 확인한 사전에서 공통 표준 IPA 자료를 제공하지 않아요. 지역별 전체 단어 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "xhtml": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "yr": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "yrs": {
    "unavailableReason": "확인한 사전에 표제어는 있지만 IPA 자료를 제공하지 않아요. 지역별 듣기는 사용할 수 있어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "zdnet": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "zope": {
    "unavailableReason": "네이버와 CMUdict에 IPA가 없고 공개 발음 사전은 연결 제한으로 추가 확인이 필요해요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  },
  "zum": {
    "unavailableReason": "네이버 영어사전·공개 발음 사전·CMUdict에서 이 표제어의 IPA 자료를 찾지 못했어요.",
    "source": "네이버 영어사전 + Free Dictionary API + CMUdict 전수 검증"
  }
})) {
  window.pronunciationDisplayOverrides[word] = Object.assign(
    {},
    window.pronunciationDisplayOverrides[word] || {},
    reasonInfo
  );
}
