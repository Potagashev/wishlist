import json
import os
import pandas as pd
from tqdm import tqdm
import config as cfg
from utils import md5_hash

class Transaction:
    def __init__(self, transaction_id, transaction_datetime, **kwargs):
        self.data = {
            **{"tid": transaction_id, "datetime": transaction_datetime, "products": [],},
            **kwargs,
        }
    def add_item(
        self, product_id: str, product_quantity: float, trn_sum_from_iss: float, trn_sum_from_red: float,
    ) -> None:
        p = {
            "product_id": product_id,
            "quantity": product_quantity,
            "s": trn_sum_from_iss,
            "r": "0" if trn_sum_from_red is None or pd.isna(trn_sum_from_red) else trn_sum_from_red,
        }
        self.data["products"].append(p)
    def as_dict(self,):
        return self.data
    def transaction_id(self,):
        return self.data["tid"]
class ClientHistory:
    def __init__(
        self, client_id,
    ):
        self.data = {
            "client_id": client_id,
            "transaction_history": [],
        }
    def add_transaction(
        self, transaction,
    ):
        self.data["transaction_history"].append(transaction)
    def as_dict(self,):
        return self.data
    def client_id(self,):
        return self.data["client_id"]